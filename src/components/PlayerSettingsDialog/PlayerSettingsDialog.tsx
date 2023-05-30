import { Color, Role } from "@/models";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  Slide,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { TransitionProps } from "@mui/material/transitions";
import { FC, forwardRef, useState } from "react";
import SettingsIcon from "../../../public/icons/Cog_wheel_icon-25.svg";
import ColorDialog from "../ColorDialog/ColorDialog";
import InputBar from "../InputBar/InputBar";
import { useGame } from "@/providers/Game";
import { useToast } from "@/providers/ToastProvider";

interface PlayerSettingsDialogProps {
  id: string;
  name: string;
  role: Role;
  color: Color;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PlayerSettingsDialog: FC<PlayerSettingsDialogProps> = ({
  id,
  name,
  role,
  color,
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { updatePlayerSettings, activePlayer } = useGame();
  const { showToast } = useToast();

  const [playerName, setPlayerName] = useState(name);
  const [playerRole, setPlayerRole] = useState(role);
  const [playerColor, setPlayerColor] = useState(color);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setPlayerName(name);
    setPlayerRole(role);
    setPlayerColor(color);
    handleClose();
  };

  const updatePlayer = async () => {
    try {
      await updatePlayerSettings(id, playerName, playerRole, playerColor);
      showToast("Player settings updated", "success");
    } catch (error) {
      console.log(error);
      showToast("Failed to update player settings", "error");
    } finally {
      handleClose();
    }
  };

  return (
    <div>
      <Button
        variant="dark"
        onClick={handleClickOpen}
        sx={{
          backgroundColor: "#B4BEC8",
          boxShadow: "0px 4px 0px #929BA2",
          minWidth: "unset",
          width: "100%",
          height: "48px",

          [theme.breakpoints.down(670)]: {
            padding: "1px 5px",
            width: "30px",
            height: "26px",
          },
        }}
      >
        <SettingsIcon color={theme.palette.primary.main} height="100%" />
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle variant="h1" textAlign="center">
          Player Settings
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            spacing={1}
            sx={{ maxWidth: "600px", margin: "auto" }}
          >
            <Grid xs={12}>
              <InputBar
                placeholder="Name"
                value={playerName}
                setInputValue={setPlayerName}
              />
            </Grid>
            <Grid xs={6}>
              <ColorDialog
                color={playerColor}
                setColor={setPlayerColor}
                title="Color"
              />
            </Grid>
            <Grid xs={6}>
              {activePlayer?.role === Role.Owner && (
                <FormControl
                  sx={{
                    unset: "all",
                    width: "100%",

                    "& .Mui-disabled": {
                      backgroundColor: "#EDEDED",
                      height: "40px",
                      boxShadow: "none",
                      display: "flex",
                      justifyContent: "center",
                      border: "none",
                    },
                  }}
                >
                  <Select
                    value={playerRole}
                    sx={{
                      border: "none",
                      color: "white",
                      borderRadius: "7px",
                      height: "32px",
                      backgroundColor: theme.palette.primary.main,
                      marginBottom:
                        role === Role.Owner || role === Role.Guest ? "" : "8px",
                      boxShadow: `0px 8px ${theme.palette.primary.dark}`,
                      fontSize: "12px",

                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "& .MuiSelect-select": {
                        padding: "0px !important",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                    }}
                    disabled={
                      role === Role.Owner || role === Role.Guest ? true : false
                    }
                    inputProps={{ IconComponent: () => null }}
                    onChange={(e) => setPlayerRole(e.target.value as Role)}
                  >
                    {role == Role.Owner && (
                      <MenuItem value={Role.Owner}>Owner</MenuItem>
                    )}
                    {role == Role.Guest && (
                      <MenuItem value={Role.Guest}>Guest</MenuItem>
                    )}

                    <MenuItem value={Role.Admin}>Admin</MenuItem>
                    <MenuItem value={Role.Edit}>Edit</MenuItem>
                    <MenuItem value={Role.View}>View</MenuItem>
                  </Select>
                </FormControl>
              )}
            </Grid>
            <Grid xs={6}>
              <Button variant="dark" onClick={handleCancel}>
                Cancel
              </Button>
            </Grid>
            <Grid xs={6}>
              <Button variant="dark" onClick={updatePlayer}>
                Save
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlayerSettingsDialog;
