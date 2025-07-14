import React from "react";
import { useTheme } from "../../hooks/use-theme";

const SettingToggle = ({ label }) => (
  <div className="flex items-center gap-4 px-4 min-h-14 justify-between bg-gray-50 dark:bg-slate-950">
    <p className="text-[#101418] dark:text-slate-200 text-base font-normal leading-normal flex-1 truncate">{label}</p>
    <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none bg-[#eaedf1] dark:bg-slate-800 p-0.5 has-[:checked]:justify-end has-[:checked]:bg-[#dce6f3] dark:has-[:checked]:bg-blue-600">
      <div className="h-full w-[27px] rounded-full bg-white shadow dark:bg-slate-300"></div>
      <input type="checkbox" className="invisible absolute" />
    </label>
  </div>
);

const SettingAction = ({ label, buttonLabel }) => (
  <div className="flex items-center gap-4 px-4 min-h-14 justify-between bg-gray-50 dark:bg-slate-950">
    <p className="text-[#101418] dark:text-slate-200 text-base font-normal leading-normal flex-1 truncate">{label}</p>
    <button className="flex min-w-[84px] items-center justify-center rounded-full h-8 px-4 bg-[#eaedf1] dark:bg-slate-800 text-sm font-medium text-[#101418] dark:text-white">{buttonLabel}</button>
  </div>
);

const SettingBlock = ({ title, items }) => (
  <>
    <h2 className="text-[#101418] dark:text-slate-100 text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">{title}</h2>
    {items.map((item, i) =>
      item.type === "toggle" ? (
        <SettingToggle key={i} label={item.label} />
      ) : (
        <SettingAction key={i} label={item.label} buttonLabel={item.buttonLabel} />
      )
    )}
  </>
);

const SettingsPage = () => {
  const { theme } = useTheme();

  return (
    <div className="relative flex min-h-screen flex-col bg-gray-50 dark:bg-slate-900 overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-40 flex flex-1 justify-center py-5">
          <div className="flex flex-col max-w-[960px] w-full">
            <div className="flex justify-between gap-3 p-4">
              <p className="text-[32px] font-bold text-[#101418] dark:text-white">Settings</p>
            </div>

            <SettingBlock
              title="Account Settings"
              items={[
                { label: "Profile Information", buttonLabel: "Edit" },
                { label: "Change Password", buttonLabel: "Change" },
                { label: "Two-Factor Authentication", type: "toggle" },
                { label: "Recent Login Activity", buttonLabel: "View" },
                { label: "Connect Accounts", buttonLabel: "Connect" },
              ]}
            />

            <SettingBlock
              title="Application Settings"
              items={[
                { label: "Theme", type: "toggle" },
                { label: "Language", buttonLabel: "English" },
                { label: "Timezone", buttonLabel: "UTC" },
                { label: "Notifications", buttonLabel: "Manage" },
              ]}
            />

            <SettingBlock
              title="Organization Settings"
              items={[
                { label: "Company Information", buttonLabel: "View" },
                { label: "Billing Details", buttonLabel: "Manage" },
                { label: "Plan Management", buttonLabel: "Manage" },
                { label: "Team Management", buttonLabel: "Manage" },
              ]}
            />

            <SettingBlock
              title="Customization Settings"
              items={[
                { label: "Show/Hide Dashboard Widgets", buttonLabel: "Customize" },
                { label: "Sidebar Layout", buttonLabel: "Expanded" },
                { label: "Dashboard Theme", buttonLabel: "Choose Theme" },
                { label: "Branding Logo", buttonLabel: "Change" },
              ]}
            />

            <SettingBlock
              title="Data Settings"
              items={[
                { label: "Import Data", buttonLabel: "Import" },
                { label: "Export Data", buttonLabel: "Export" },
                { label: "Create Backup", buttonLabel: "Create" },
                { label: "Restore Backup", buttonLabel: "Restore" },
                { label: "Data Retention Policy", buttonLabel: "Manage" },
                { label: "Clear Cache", buttonLabel: "Clear" },
              ]}
            />

            <SettingBlock
              title="Notifications Settings"
              items={[
                { label: "Leads Notifications", type: "toggle" },
                { label: "New Users Notifications", type: "toggle" },
                { label: "Reports Notifications", type: "toggle" },
              ]}
            />

            <SettingBlock
              title="Beta Features"
              items={[
                { label: "Experimental Feature 1", type: "toggle" },
                { label: "Experimental Feature 2", type: "toggle" },
              ]}
            />

            <SettingBlock
              title="Developer Tools"
              items={[
                { label: "API Keys", buttonLabel: "Manage" },
                { label: "Webhooks", buttonLabel: "Manage" },
                { label: "Audit Logs", buttonLabel: "View" },
              ]}
            />

            <SettingBlock
              title="Legal & Privacy"
              items={[
                { label: "Terms of Service", buttonLabel: "View" },
                { label: "Privacy Policy", buttonLabel: "View" },
                { label: "Request Account Deletion", buttonLabel: "Request" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
