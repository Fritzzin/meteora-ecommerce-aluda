import styles from "./page.module.css";
import Produto from "@/app/components/Produto";


async function fetchProdutoPorSlug(slug) {
  const response = await fetch(`https://api.npoint.io/80ec40099198860541ff/produtos/${slug}`)
  if (!response) {
    throw new Error("nao foi possivel carregar dados");
  }

  const produto = await response.json();

  return produto;
}

export default async function ProdutoPage({ params }) {
  const produto = await fetchProdutoPorSlug(params.slug);
  return (
    <main className={styles.main}>
      <Produto produto={produto} />
    </main>
  );
}

export async function generateStaticParams() {
  const res = await fetch(`https://api.npoint.io/80ec40099198860541ff`);

  const {produtos} = await res.json();

  return produtos.map((produto) => ({ slug: produto.id.toString() }))
}