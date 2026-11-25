
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  Heart,
  MessageCircle,
  Users,
  Target,
  Wallet,
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const platforms = {
  Instagram: [
    {
      id: "views",
      name: "Reels / Video Views",
      unit: "views",
      rate: 0.15,
      min: 1000,
      max: 100000,
      packages: [
        { name: "Starter", price: 199, target: 1500 },
        { name: "Basic", price: 499, target: 4000 },
        { name: "Standard", price: 999, target: 8500 },
        { name: "Premium", price: 1999, target: 18000 },
      ],
    },
    {
      id: "likes",
      name: "Genuine Likes Campaign",
      unit: "estimated likes",
      rate: 3,
      min: 25,
      max: 10000,
      packages: [
        { name: "Starter", price: 199, target: 50 },
        { name: "Basic", price: 499, target: 150 },
        { name: "Standard", price: 999, target: 350 },
        { name: "Premium", price: 1999, target: 750 },
      ],
    },
    {
      id: "comments",
      name: "Genuine Comments Campaign",
      unit: "estimated comments",
      rate: 15,
      min: 10,
      max: 2000,
      packages: [
        { name: "Starter", price: 199, target: 10 },
        { name: "Basic", price: 499, target: 30 },
        { name: "Standard", price: 999, target: 65 },
        { name: "Premium", price: 1999, target: 130 },
      ],
    },
    {
      id: "reach",
      name: "Post / Story Reach",
      unit: "accounts reached",
      rate: 0.12,
      min: 1000,
      max: 100000,
      packages: [
        { name: "Starter", price: 199, target: 2000 },
        { name: "Basic", price: 499, target: 5000 },
        { name: "Standard", price: 999, target: 11000 },
        { name: "Premium", price: 1999, target: 23000 },
      ],
    },
    {
      id: "followers",
      name: "Follower Growth Campaign",
      unit: "estimated followers",
      rate: 10,
      min: 10,
      max: 5000,
      profile: true,
      packages: [
        { name: "Starter", price: 199, target: 15 },
        { name: "Basic", price: 499, target: 45 },
        { name: "Standard", price: 999, target: 100 },
        { name: "Premium", price: 1999, target: 200 },
      ],
    },
  ],

  YouTube: [
    {
      id: "views",
      name: "Video Views",
      unit: "views",
      rate: 0.15,
      min: 1000,
      max: 100000,
      packages: [
        { name: "Starter", price: 199, target: 1500 },
        { name: "Basic", price: 499, target: 4000 },
        { name: "Standard", price: 999, target: 8500 },
        { name: "Premium", price: 1999, target: 18000 },
      ],
    },
    {
      id: "shorts",
      name: "Shorts Views",
      unit: "views",
      rate: 0.12,
      min: 1000,
      max: 100000,
      packages: [
        { name: "Starter", price: 199, target: 1800 },
        { name: "Basic", price: 499, target: 4500 },
        { name: "Standard", price: 999, target: 10000 },
        { name: "Premium", price: 1999, target: 22000 },
      ],
    },
    {
      id: "likes",
      name: "Genuine Likes Campaign",
      unit: "estimated likes",
      rate: 3,
      min: 25,
      max: 10000,
      packages: [
        { name: "Starter", price: 199, target: 50 },
        { name: "Basic", price: 499, target: 150 },
        { name: "Standard", price: 999, target: 350 },
        { name: "Premium", price: 1999, target: 750 },
      ],
    },
    {
      id: "comments",
      name: "Genuine Comments Campaign",
      unit: "estimated comments",
      rate: 15,
      min: 10,
      max: 2000,
      packages: [
        { name: "Starter", price: 199, target: 10 },
        { name: "Basic", price: 499, target: 30 },
        { name: "Standard", price: 999, target: 65 },
        { name: "Premium", price: 1999, target: 130 },
      ],
    },
    {
      id: "subscribers",
      name: "Subscriber Growth Campaign",
      unit: "estimated subscribers",
      rate: 12,
      min: 10,
      max: 5000,
      profile: true,
      packages: [
        { name: "Starter", price: 199, target: 15 },
        { name: "Basic", price: 499, target: 40 },
        { name: "Standard", price: 999, target: 85 },
        { name: "Premium", price: 1999, target: 170 },
      ],
    },
  ],

  Facebook: [
    {
      id: "views",
      name: "Reels / Video Views",
      unit: "views",
      rate: 0.15,
      min: 1000,
      max: 100000,
      packages: [
        { name: "Starter", price: 199, target: 1500 },
        { name: "Basic", price: 499, target: 4000 },
        { name: "Standard", price: 999, target: 8500 },
        { name: "Premium", price: 1999, target: 18000 },
      ],
    },
    {
      id: "reach",
      name: "Post Reach",
      unit: "accounts reached",
      rate: 0.12,
      min: 1000,
      max: 100000,
      packages: [
        { name: "Starter", price: 199, target: 2000 },
        { name: "Basic", price: 499, target: 5000 },
        { name: "Standard", price: 999, target: 11000 },
        { name: "Premium", price: 1999, target: 23000 },
      ],
    },
    {
      id: "likes",
      name: "Genuine Reactions Campaign",
      unit: "estimated reactions",
      rate: 3,
      min: 25,
      max: 10000,
      packages: [
        { name: "Starter", price: 199, target: 50 },
        { name: "Basic", price: 499, target: 150 },
        { name: "Standard", price: 999, target: 350 },
        { name: "Premium", price: 1999, target: 750 },
      ],
    },
    {
      id: "comments",
      name: "Genuine Comments Campaign",
      unit: "estimated comments",
      rate: 15,
      min: 10,
      max: 2000,
      packages: [
        { name: "Starter", price: 199, target: 70 },
        { name: "Basic", price: 499, target: 100 },
        { name: "Standard", price: 999, target: 150 },
        { name: "Premium", price: 1999, target: 200 },
      ],
    },
    {
      id: "followers",
      name: "Page Follower Growth Campaign",
      unit: "estimated followers",
      rate: 10,
      min: 10,
      max: 5000,
      profile: true,
      packages: [
        { name: "Starter", price: 199, target: 50 },
        { name: "Basic", price: 499, target: 100 },
        { name: "Standard", price: 999, target: 200 },
        { name: "Premium", price: 1999, target: 450 },
      ],
    },
  ],
};

const platformIcons = {
  Instagram: FaInstagram,
  YouTube: FaYoutube,
  Facebook: FaFacebook
};

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function NewOrder() {
  const navigate = useNavigate();

  const [platform, setPlatform] = useState("Instagram");
  const [objectiveId, setObjectiveId] = useState("views");
  const [pricingMode, setPricingMode] = useState("package");
  const [packageIndex, setPackageIndex] = useState(1);
  const [customTarget, setCustomTarget] = useState("5000");
  const [urlsText, setUrlsText] = useState("");
  const [requirements, setRequirements] = useState("");
  const [error, setError] = useState("");

  const objectives = platforms[platform];

  const objective = objectives.find(
    (item) => item.id === objectiveId
  ) || objectives[0];

  const selectedPackage = objective.packages[packageIndex];

  const urls = useMemo(
    () =>
      urlsText
        .split("\n")
        .map((url) => url.trim())
        .filter(Boolean),
    [urlsText]
  );

  const isProfile = Boolean(objective.profile);
  const urlCount = isProfile ? 1 : urls.length;

  const targetPerUrl =
    pricingMode === "package"
      ? selectedPackage.target
      : Number(customTarget);

  const totalTarget = targetPerUrl * urlCount;

  const customPricePerUrl = Math.ceil(
    targetPerUrl * objective.rate
  );

  const amountPerUrl =
    pricingMode === "package"
      ? selectedPackage.price
      : customPricePerUrl;

  const totalAmount = amountPerUrl * urlCount;

  const PlatformIcon = platformIcons[platform];

  const changePlatform = (value) => {
    setPlatform(value);
    setObjectiveId(platforms[value][0].id);
    setPackageIndex(1);
    setCustomTarget("5000");
    setUrlsText("");
    setError("");
  };

  const changeObjective = (value) => {
    setObjectiveId(value);
    setPackageIndex(1);
    setCustomTarget("5000");
    setUrlsText("");
    setError("");
  };

  const validateUrl = (value) => {
    try {
      const parsed = new URL(value);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (isProfile && urls.length !== 1) {
      setError("Profile / channel / page promotion ke liye ek URL required hai.");
      return;
    }

    if (!isProfile && urls.length === 0) {
      setError("Kam se kam ek content URL enter karo.");
      return;
    }

    if (!isProfile && urls.length > 20) {
      setError("Ek order mein maximum 20 content URLs allowed hain.");
      return;
    }

    if (!urls.every(validateUrl)) {
      setError("Har URL valid http:// ya https:// link hona chahiye.");
      return;
    }

    if (
      pricingMode === "custom" &&
      (
        !Number.isInteger(Number(customTarget)) ||
        Number(customTarget) < objective.min ||
        Number(customTarget) > objective.max
      )
    ) {
      setError(
        `Target ${objective.min.toLocaleString("en-IN")} se ${objective.max.toLocaleString("en-IN")} ke beech hona chahiye.`
      );
      return;
    }

    const order = {
      id: `SB-${Date.now()}`,
      platform,
      objective: objective.name,
      objectiveId: objective.id,
      unit: objective.unit,
      pricingMode,
      packageName:
        pricingMode === "package"
          ? selectedPackage.name
          : "Custom Target",
      targetPerUrl,
      totalTarget,
      urlCount,
      urls,
      amountPerUrl,
      amount: totalAmount,
      details: requirements.trim(),
      status: "Pending Review",
      date: new Date().toLocaleDateString("en-IN"),
      createdAt: new Date().toISOString(),
      disclaimer: "Campaign target is an estimate, not a guaranteed result.",
    };

    const existingOrders = JSON.parse(
      localStorage.getItem("demoOrders") || "[]"
    );

    localStorage.setItem(
      "demoOrders",
      JSON.stringify([order, ...existingOrders])
    );

    navigate("/dashboard/orders", {
      state: { orderCreated: true },
    });
  };

  return (
    <div className="min-h-screen bg-[#09090f] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-purple-400">
            CAMPAIGN MANAGEMENT
          </p>
          <h1 className="text-3xl font-bold md:text-4xl">
            Create New Order
          </h1>
          <p className="mt-2 text-gray-400">
            Choose your platform, campaign objective and target.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 lg:grid-cols-[1fr_340px]"
        >
          <div className="space-y-6">
            {/* Platform */}
            <section className="rounded-2xl border border-white/10 bg-[#11111b] p-5">
              <h2 className="mb-4 text-lg font-semibold">
                1. Select Platform
              </h2>

              <div className="grid grid-cols-3 gap-3">
                {Object.keys(platforms).map((name) => {
                  const Icon = platformIcons[name];
                  const active = platform === name;

                  return (
                    <button
                      type="button"
                      key={name}
                      onClick={() => changePlatform(name)}
                      className={`flex items-center justify-center gap-2 rounded-xl border p-4 transition ${
                        active
                          ? "border-purple-500 bg-purple-500/15 text-purple-300"
                          : "border-white/10 bg-white/[0.03] text-gray-400 hover:border-purple-500/50"
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{name}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Objective */}
            <section className="rounded-2xl border border-white/10 bg-[#11111b] p-5">
              <h2 className="mb-4 text-lg font-semibold">
                2. What Do You Want to Grow?
              </h2>

              <div className="grid gap-3 sm:grid-cols-2">
                {objectives.map((item) => {
                  const active = objectiveId === item.id;

                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => changeObjective(item.id)}
                      className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                        active
                          ? "border-purple-500 bg-purple-500/15"
                          : "border-white/10 bg-white/[0.03] hover:border-purple-500/50"
                      }`}
                    >
                      <span className="rounded-lg bg-purple-500/15 p-2 text-purple-300">
                        {item.profile ? (
                          <Users size={20} />
                        ) : item.id === "likes" ? (
                          <Heart size={20} />
                        ) : item.id === "comments" ? (
                          <MessageCircle size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </span>
                      <span className="font-medium">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Pricing Mode */}
            <section className="rounded-2xl border border-white/10 bg-[#11111b] p-5">
              <h2 className="mb-4 text-lg font-semibold">
                3. Choose Pricing Type
              </h2>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setPricingMode("package")}
                  className={`rounded-xl border p-4 text-left ${
                    pricingMode === "package"
                      ? "border-purple-500 bg-purple-500/15"
                      : "border-white/10 bg-white/[0.03]"
                  }`}
                >
                  <Wallet className="mb-2 text-purple-300" />
                  <p className="font-semibold">Fixed Packages</p>
                  <p className="mt-1 text-sm text-gray-400">
                    Ready-made budget and target options.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPricingMode("custom")}
                  className={`rounded-xl border p-4 text-left ${
                    pricingMode === "custom"
                      ? "border-purple-500 bg-purple-500/15"
                      : "border-white/10 bg-white/[0.03]"
                  }`}
                >
                  <Target className="mb-2 text-purple-300" />
                  <p className="font-semibold">Custom Target</p>
                  <p className="mt-1 text-sm text-gray-400">
                    Enter your own target quantity.
                  </p>
                </button>
              </div>

              {pricingMode === "package" ? (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {objective.packages.map((item, index) => (
                    <button
                      type="button"
                      key={item.name}
                      onClick={() => setPackageIndex(index)}
                      className={`rounded-xl border p-4 text-left ${
                        packageIndex === index
                          ? "border-purple-500 bg-purple-500/10"
                          : "border-white/10 bg-white/[0.03]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{item.name}</span>
                        {packageIndex === index && (
                          <CheckCircle2
                            size={18}
                            className="text-purple-400"
                          />
                        )}
                      </div>

                      <p className="mt-3 text-2xl font-bold">
                        {formatPrice(item.price)}
                      </p>

                      <p className="mt-1 text-sm text-purple-300">
                        {item.target.toLocaleString("en-IN")}{" "}
                        {objective.unit}
                      </p>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="mt-5">
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Enter your target ({objective.unit})
                  </label>

                  <input
                    type="number"
                    min={objective.min}
                    max={objective.max}
                    step="1"
                    value={customTarget}
                    onChange={(event) =>
                      setCustomTarget(event.target.value)
                    }
                    className="w-full rounded-xl border border-white/10 bg-[#09090f] px-4 py-3 text-white outline-none focus:border-purple-500"
                    placeholder="Enter target quantity"
                  />

                  <p className="mt-2 text-xs text-gray-500">
                    Minimum: {objective.min.toLocaleString("en-IN")} ·
                    Maximum: {objective.max.toLocaleString("en-IN")}
                  </p>

                  <div className="mt-4 rounded-xl bg-purple-500/10 p-4">
                    <p className="text-sm text-gray-400">
                      Calculated budget per content item / campaign
                    </p>
                    <p className="mt-1 text-2xl font-bold text-purple-300">
                      {formatPrice(customPricePerUrl)}
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* URLs */}
            <section className="rounded-2xl border border-white/10 bg-[#11111b] p-5">
              <h2 className="mb-2 text-lg font-semibold">
                4. {isProfile ? "Profile / Channel / Page URL" : "Content URL"}
              </h2>

              <p className="mb-4 text-sm text-gray-400">
                {isProfile
                  ? "Enter the public profile, channel or page link."
                  : "Enter one public post, reel, short or video URL per line. Each URL gets the selected target."}
              </p>

              <div className="mb-2 flex items-center gap-2 text-sm text-gray-300">
                <LinkIcon size={16} className="text-purple-400" />
                {isProfile ? "One URL required" : "One URL per line"}
              </div>

              <textarea
                rows={isProfile ? 2 : 4}
                value={urlsText}
                onChange={(event) => setUrlsText(event.target.value)}
                placeholder={
                  isProfile
                    ? "https://www.instagram.com/yourprofile/"
                    : "https://www.instagram.com/reel/...\nhttps://www.instagram.com/reel/..."
                }
                className="w-full rounded-xl border border-white/10 bg-[#09090f] px-4 py-3 text-white outline-none focus:border-purple-500"
              />

              {!isProfile && (
                <p className="mt-2 text-xs text-gray-500">
                  Content URLs added: {urls.length} / 20
                </p>
              )}
            </section>

            {/* Requirements */}
            <section className="rounded-2xl border border-white/10 bg-[#11111b] p-5">
              <h2 className="mb-3 text-lg font-semibold">
                5. Additional Requirements
              </h2>

              <textarea
                rows={3}
                value={requirements}
                onChange={(event) => setRequirements(event.target.value)}
                placeholder="Target audience, country, age group or other campaign instructions..."
                className="w-full rounded-xl border border-white/10 bg-[#09090f] px-4 py-3 text-white outline-none focus:border-purple-500"
              />
            </section>

            {error && (
              <div className="flex gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                <AlertCircle size={18} className="shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-purple-600 px-6 py-4 font-semibold text-white transition hover:bg-purple-500"
            >
              Submit Demo Order
            </button>
          </div>

          {/* Summary */}
          <aside className="h-fit rounded-2xl border border-white/10 bg-[#11111b] p-5 lg:sticky lg:top-6">
            <h2 className="mb-5 text-xl font-bold">Order Summary</h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-gray-400">Platform</span>
                <span className="font-medium">{platform}</span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-gray-400">Objective</span>
                <span className="max-w-[60%] text-right font-medium">
                  {objective.name}
                </span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-gray-400">Pricing</span>
                <span>{pricingMode === "package" ? selectedPackage.name : "Custom"}</span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-gray-400">URLs / Campaigns</span>
                <span>{urlCount}</span>
              </div>

              <div className="rounded-xl border border-purple-500/30 bg-purple-500/10 p-4">
                <p className="text-sm text-gray-300">
                  Estimated target
                </p>
                <p className="mt-2 text-2xl font-bold text-purple-300">
                  {totalTarget.toLocaleString("en-IN")}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  {objective.unit}
                </p>
              </div>

              <div className="flex justify-between border-t border-white/10 pt-4">
                <span className="text-gray-400">Budget per URL</span>
                <span>{formatPrice(amountPerUrl)}</span>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <span className="font-semibold">Total Budget</span>
                <span className="text-2xl font-bold text-purple-300">
                  {formatPrice(totalAmount)}
                </span>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-yellow-500/10 p-3 text-xs leading-5 text-yellow-200">
              These are illustrative demo estimates. Actual campaign
              results may vary. Views, reach, likes, comments and
              follower growth are not guaranteed.
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}
