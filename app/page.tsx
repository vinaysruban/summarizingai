import Input from "@/components/input";

export default async function Home() {
  return (
    <main className="py-8">
      <section className="text-center w-100 child:py-2 child:px-16">
        <h1 className="from-neutral-800 text-4xl font-black">Hello World!</h1>
        <h2 className="from-neutral-900 text-xl my-8">
          This function converts your input below 👇 into something a reading level of
          your choice ✍!
        </h2>
        <Input />
      </section>
    </main>
  );
}
