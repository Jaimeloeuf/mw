export default function ErrorModal(props: {
  error?: Error;
  clearError?: () => unknown;
}) {
  if (props.error === undefined) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center overflow-y-scroll bg-black bg-opacity-70">
      <div className="m-8 p-8 bg-white rounded-lg w-full">
        <div className="max-w-screen-sm min-w-full">
          <p className="text-2xl">Error: {props.error.message}</p>
          {import.meta.env.DEV && (
            <div className="pt-4">
              <p className="pb-1">error.stack (only shown in dev mode)</p>
              <pre className="font-extralight text-xs overflow-x-scroll">
                {props.error.stack}
              </pre>
            </div>
          )}

          {props.clearError !== undefined && (
            <div className="pt-4 w-full text-right">
              <button
                onClick={props.clearError}
                title="Clear Error"
                className="px-4 py-2 border bg-zinc-200 rounded-lg"
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
