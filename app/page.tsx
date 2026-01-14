import { ThemeToggle } from "@/components/common/ThemeToggle";

export default function Home() {
	return (
		<div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
			<main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
				<div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
					<ThemeToggle />
					<h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-foreground dark:text-zinc-50">
						Page 1
					</h1>
				</div>
			</main>
		</div>
	);
}
