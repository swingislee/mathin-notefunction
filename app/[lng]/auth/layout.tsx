export default function gamesLayout({children,
  params: {
      lng
  }
  }: {
    children: React.ReactNode;
    params: {
      lng: string;
    }}) {
  return (
    <div className="h-full flex items-center justify-center bg-amber-100">
        {children}
    </div>
  );
};
