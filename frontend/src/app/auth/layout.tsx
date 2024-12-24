import "../../styles/tailwind.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Fondo con imagen */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/header-img-2YKJ2MVbocBpjuim2URYYA8ubj5pLj.jpg')",
        }}
      />

      {/* Overlay con mejor contraste */}
      <div className="absolute inset-0 bg-auth-gradient-light dark:bg-auth-gradient-dark backdrop-blur-[2px]" />

      {/* Contenedor del formulario */}
      <div className="relative z-10 w-full max-w-md p-6 mx-4 md:mx-0">
        <div className="bg-light-bg-container dark:bg-dark-bg-container rounded-2xl shadow-auth dark:shadow-auth-dark p-6 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-90">
          {children}
        </div>
      </div>
    </main>
  );
}