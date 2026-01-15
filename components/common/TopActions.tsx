import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

export const TopActions = () => {
	return (
		<div className="fixed top-4 right-4">
			<div className="flex flex-row gap-2">
				<ThemeToggle />
				<MobileMenu />
			</div>
		</div>
	);
};
