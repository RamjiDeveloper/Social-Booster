
const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description: "Register and access your personal marketing dashboard."
  },
  {
    number: "02",
    title: "Choose Your Service",
    description: "Select a suitable campaign and review its details."
  },
  {
    number: "03",
    title: "Make Payment",
    description: "Complete your payment through an available gateway."
  },
  {
    number: "04",
    title: "Track Your Campaign",
    description: "Monitor progress and review your campaign delivery."
  }
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="px-5 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">

        <div className="text-center">
          <span className="text-sm font-bold uppercase tracking-[3px] text-violet-400">
            Simple Process
          </span>

          <h2 className="mt-4 text-3xl font-black sm:text-5xl">
            How It
            <span className="gradient-text"> Works</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl border border-white/10 bg-[#14141f] p-7"
            >
              <span className="text-5xl font-black text-violet-500/20">
                {step.number}
              </span>

              <h3 className="mt-6 text-xl font-bold">
                {step.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-zinc-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
