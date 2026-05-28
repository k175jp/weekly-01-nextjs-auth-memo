import Button from "@/components/ui/Button";

type HeaderProps = {
  userEmail?: string;
  onLogout?: () => void;
};

export default function Header({
  userEmail,
  onLogout,
}: HeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">
          Memo App
        </h1>

        {userEmail && (
          <p className="mt-2 text-sm text-zinc-500">
            Logged in as {userEmail}
          </p>
        )}
      </div>

      {userEmail && onLogout && (
        <Button
          variant="secondary"
          onClick={onLogout}
        >
          Logout
        </Button>
      )}
    </div>
  );
}
