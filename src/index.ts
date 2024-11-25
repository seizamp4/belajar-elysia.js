import { Elysia } from "elysia";
import { music } from "../db/db";

const app = new Elysia()
// Tes Elysia
  .get("/", () => "Hello Elysia")

  // Ini endpoint untuk mendapatkan semua lagu Kessoku Band
  .get("/music", () => music)
  .get("/album", () => music)
  .get("/title", () => music)

  // Endpoint buat ngambil lagu dari ID
  .get("/music/:id", ({ params }) => {
    const song = music.find((m) => m.id === Number(params.id));
    return song || { message: "Musik tidak ditemukan!"}
  })

  // Endpoint untuk ngambil lagu dari album
  .get("/album/:album", ({ params }) => {
    // Decode  URL yang awalnya %20 menjadi spasi
    const namaAlbum = decodeURIComponent(params.album);
    const song = music.filter((m) => m.album.toLowerCase() === namaAlbum.toLowerCase());
    return song.length ? song : { message : "Tidak ada lagu yang berasal dari album itu!"}
  })

  // Endpoint untuk ngambil lagu dari judul lagunya
  .get("/title/:title", ({ params }) => {
    const judulLagu = decodeURIComponent(params.title);
    const song = music.find((m) => m.title.toLowerCase() === judulLagu.toLowerCase());
    return song || { message : "Lagu dengan judul tersebut tidak di temukan!"}
  })
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
