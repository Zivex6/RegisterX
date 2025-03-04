import Head from "next/head";
import Login from './login'

export default function Home() {
  return (
    <>
      <Head>
        <html lang="en">
          <title>RegisterX</title>
          <meta name="description" content="Un forum pentru discuții și idei." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
        </html>
      </Head>

      <main>
        <Login />
      </main>
    </>
  );
}