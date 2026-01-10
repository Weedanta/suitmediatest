export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-[#2C2C2C]">{children}</div>
  );
}
