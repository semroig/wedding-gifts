// import { createBrowserClient } from "@supabase/ssr";

import Body from "./components/body";

export default async function Home() {
  // // Inicio client de supabase
  // const supabase = createBrowserClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  // );

  return (
    <div>
      <Body></Body>
    </div>
  );
}
