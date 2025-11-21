import styles from "./page.module.css";
import Produto from "@/app/components/Produto";


async function fetchProdutoPorSlug(slug) {
  const response = await fetch(`https://api.npoint.io/ae7156a63741041f5ce1/${slug}`)
  if (!response) {
    throw new Error("nao foi possivel carregar dados");
  }

  const produto = await response.json();

  return produto;
}

export default async function ProdutoPage({ params }) {
  const slugInt = parseInt(params.slug);
  const produto = await fetchProdutoPorSlug(slugInt - 1);
  return (
    <main className={styles.main}>
      <Produto produto={produto} />
    </main>
  );
}

export async function generateStaticParams() {
  const res = await fetch(`https://api.npoint.io/ae7156a63741041f5ce1`);

  const produtos = await res.json();

  return produtos.map((produto) => ({ slug: produto.id.toString() }))
}