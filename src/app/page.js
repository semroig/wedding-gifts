import { createBrowserClient } from "@supabase/ssr";

import Body from "./components/body";

export default async function Home() {
  // Inicio client de supabase
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  // const [prods, setProds] = useState([]);
  // const { data: records } = supabase.from("products").select();

  // console.log(records);
  // setProds(records);

  const { data: products } = await supabase.from("products").select();
  console.log(products);

  return (
    <div>
      <Body records={products}></Body>
    </div>
  );
}
