import Navbar from "./Navbar";


export default function Home(){
    return (
        <>
        <header>
            <Navbar/>
        </header>
        <main className="main-center">
            <h2>Biblioteca Farias</h2>
            <p>
                Esse projeto realiza o cadastro de <strong>Autores</strong> e suas <strong>Obras</strong> dentro do sistema.
            </p>
        </main>
        </>
    )
}