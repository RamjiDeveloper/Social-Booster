
import { useEffect, useState } from "react";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  ShieldCheck,
  CalendarDays,
  LockKeyhole,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const PROFILE_KEY = "socialBoosterProfile";

const initialProfile = {
  fullName: "",
  email: "",
  phone: "",
  country: "India",
  city: "",
  bio: "",
};

export default function Profile() {
  const [profile, setProfile] = useState(initialProfile);
  const [savedProfile, setSavedProfile] = useState(initialProfile);
  const [editing, setEditing] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(PROFILE_KEY) || "null"
      );

      if (saved && typeof saved === "object") {
        const loadedProfile = { ...initialProfile, ...saved };
        setProfile(loadedProfile);
        setSavedProfile(loadedProfile);
        setEditing(false);
      }
    } catch {
      localStorage.removeItem(PROFILE_KEY);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage("");
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!profile.fullName.trim()) {
      setMessageType("error");
      setMessage("Please enter your full name.");
      return;
    }

    if (
      !profile.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)
    ) {
      setMessageType("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    if (
      profile.phone &&
      !/^[0-9+\-\s()]{7,20}$/.test(profile.phone)
    ) {
      setMessageType("error");
      setMessage("Please enter a valid phone number.");
      return;
    }

    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    setSavedProfile(profile);
    setEditing(false);
    setMessageType("success");
    setMessage("Profile updated successfully.");
  };

  const handleCancel = () => {
    setProfile(savedProfile);
    setEditing(false);
    setMessage("");
  };

  const profileFields = [
    {
      label: "Full Name",
      name: "fullName",
      placeholder: "Enter your full name",
      icon: UserRound,
      required: true,
    },
    {
      label: "Email Address",
      name: "email",
      placeholder: "Enter your email",
      icon: Mail,
      required: true,
      type: "email",
    },
    {
      label: "Phone Number",
      name: "phone",
      placeholder: "Enter your phone number",
      icon: Phone,
    },
    {
      label: "City",
      name: "city",
      placeholder: "Enter your city",
      icon: MapPin,
    },
  ];

  const completionFields = [
    profile.fullName,
    profile.email,
    profile.phone,
    profile.country,
    profile.city,
    profile.bio,
  ];

  const completion = Math.round(
    (completionFields.filter((value) => String(value).trim()).length /
      completionFields.length) *
      100
  );

  return (
    <div className="min-h-screen space-y-7 bg-[#09090f] p-4 text-white sm:p-6 lg:p-8">

      {/* Header */}
      <div>
        <p className="mb-2 text-sm font-medium text-purple-400">
          ACCOUNT SETTINGS
        </p>

        <h1 className="text-2xl font-bold sm:text-3xl">
          My Profile
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Manage your personal information and account details.
        </p>
      </div>

      {/* Profile Overview */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#12121b]">
        <div className="h-32 bg-gradient-to-r from-purple-900 via-purple-700 to-indigo-900 sm:h-40" />

        <div className="relative flex flex-col gap-5 px-5 pb-6 sm:flex-row sm:items-end sm:px-8">
          <div className="-mt-12 flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-[#12121b] bg-purple-600 text-3xl font-bold shadow-xl sm:h-28 sm:w-28">
            {profile.fullName
              ? profile.fullName.charAt(0).toUpperCase()
              : <UserRound size={40} />}
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold">
              {profile.fullName || "Your Name"}
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              {profile.email || "Add your email address"}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                <ShieldCheck size={14} />
                Demo Account
              </span>

              <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-300">
                <CalendarDays size={14} />
                SocialBooster Member
              </span>
            </div>
          </div>

          {!editing && (
            <button
              onClick={() => {
                setEditing(true);
                setMessage("");
              }}
              className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold transition hover:bg-purple-500"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Completion */}
      <div className="rounded-2xl border border-white/10 bg-[#12121b] p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="font-semibold">Profile Completion</h3>
            <p className="mt-1 text-sm text-gray-400">
              Complete your profile information.
            </p>
          </div>

          <span className="text-xl font-bold text-purple-400">
            {completion}%
          </span>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-purple-500 transition-all duration-500"
            style={{ width: `${completion}%` }}
          />
        </div>
      </div>

      {/* Personal Information */}
      <div className="rounded-2xl border border-white/10 bg-[#12121b] p-5 sm:p-7">
        <div className="mb-7 flex items-center gap-3">
          <div className="rounded-xl bg-purple-500/10 p-3">
            <UserRound className="text-purple-400" size={22} />
          </div>

          <div>
            <h2 className="font-bold">Personal Information</h2>
            <p className="text-sm text-gray-400">
              Your basic account details.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave}>
          <div className="grid gap-5 md:grid-cols-2">
            {profileFields.map((field) => {
              const Icon = field.icon;

              return (
                <div key={field.name}>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    {field.label}
                    {field.required && (
                      <span className="ml-1 text-red-400">*</span>
                    )}
                  </label>

                  <div className="relative">
                    <Icon
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      type={field.type || "text"}
                      name={field.name}
                      value={profile[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required={field.required}
                      disabled={!editing}
                      className="w-full rounded-xl border border-white/10 bg-[#191923] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                </div>
              );
            })}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Country
              </label>

              <select
                name="country"
                value={profile.country}
                onChange={handleChange}
                disabled={!editing}
                className="w-full rounded-xl border border-white/10 bg-[#191923] px-4 py-3.5 text-sm text-white outline-none focus:border-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <option value="India">India</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                About You
              </label>

              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                disabled={!editing}
                rows={4}
                maxLength={300}
                placeholder="Write something about yourself..."
                className="w-full resize-none rounded-xl border border-white/10 bg-[#191923] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
              />

              <p className="mt-1 text-right text-xs text-gray-500">
                {profile.bio.length}/300 characters
              </p>
            </div>
          </div>

          {message && (
            <div
              className={`mt-5 flex items-center gap-2 rounded-xl p-3 text-sm ${
                messageType === "success"
                  ? "bg-green-500/10 text-green-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              {messageType === "success" ? (
                <CheckCircle2 size={18} />
              ) : (
                <AlertCircle size={18} />
              )}
              {message}
            </div>
          )}

          {editing && (
            <div className="mt-7 flex flex-wrap justify-end gap-3 border-t border-white/10 pt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-gray-300 transition hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold transition hover:bg-purple-500"
              >
                <Save size={17} />
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Security Section */}
      <div className="rounded-2xl border border-white/10 bg-[#12121b] p-5 sm:p-7">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-purple-500/10 p-3">
            <LockKeyhole className="text-purple-400" size={22} />
          </div>

          <div className="flex-1">
            <h2 className="font-bold">Security & Privacy</h2>
            <p className="mt-1 text-sm text-gray-400">
              Account security features will be connected to the
              authentication backend.
            </p>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-[#191923] p-4">
                <div>
                  <p className="text-sm font-medium">
                    Password Management
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Secure password change
                  </p>
                </div>

                <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs text-yellow-400">
                  Coming Soon
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-[#191923] p-4">
                <div>
                  <p className="text-sm font-medium">
                    Two-Factor Authentication
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Additional account protection
                  </p>
                </div>

                <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs text-yellow-400">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-gray-600">
        Profile data is currently saved in this browser only.
      </p>
    </div>
  );
}
