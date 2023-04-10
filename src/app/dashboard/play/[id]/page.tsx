// import { FC } from "react";

// interface pageProps {}

// const page: FC<pageProps> = ({ params: {params:} }) => {
//   return (
//     <div>
//       <h1>Id</h1>
//     </div>
//   );
// };

// export default page;

// export default function Page({ params }: { params: { id: string } }) {
//   return <h1>{params.id}</h1>;
// }

import { FC } from "react";

interface PageProps {
  params: { id: string };
}

const Page: FC<PageProps> = ({ params }) => {
  return <h1>{params.id}</h1>;
};

export default Page;
