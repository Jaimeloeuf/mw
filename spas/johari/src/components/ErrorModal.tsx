export default function ErrorModal(props: {
  error?: Error;
  clearError?: () => unknown;
}) {
  if (props.error === undefined) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center overflow-y-scroll bg-black bg-opacity-70">
      <div className="m-8 w-full rounded-lg bg-white p-8">
        <div className="min-w-full max-w-screen-sm">
          <p className="text-2xl">Error: {props.error.message}</p>
          {import.meta.env.DEV && (
            <div className="pt-4">
              <p className="pb-1">error.stack (only shown in dev mode)</p>
              <pre className="overflow-x-scroll text-xs font-extralight">
                {props.error.stack}
              </pre>
            </div>
          )}

          {props.clearError !== undefined && (
            <div className="w-full pt-4 text-right">
              <button
                onClick={props.clearError}
                title="Clear Error"
                className="rounded-lg border bg-zinc-200 px-4 py-2"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
