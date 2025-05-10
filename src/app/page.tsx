import { redirect } from "next/navigation";


export default function Home() {

  redirect('/dashboard')

  return (
      <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl text-violet-600">Hola Mundo</h1>
      </div>
  );
}
