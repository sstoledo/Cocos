import "./auth.module.css"

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/header-img-2YKJ2MVbocBpjuim2URYYA8ubj5pLj.jpg')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
        
        <div className="px-5 md:px-0">
          {children}
        </div>
      </main>
    
    </>
  );
}