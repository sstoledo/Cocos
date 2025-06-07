import { Title } from "@ui/Title";

export default async function ServiciosPage() {
  
    return (
      <div className="w-full shadow rounded-lg am:p-4 sm:p-4 md:p-6 xl:p-8 flex flex-col gap-4 h-[calc(100vh-130px)]">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <Title
              title="Mis servicios" subTitle="Gestiona tus servicios"
            />
          </div>
        </div>

      </div>
    );
}