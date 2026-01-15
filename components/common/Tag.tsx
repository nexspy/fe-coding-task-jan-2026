/**
 * Tag Component
 */

interface Props {
	children: React.ReactNode;
	bgColor?: string;
	textColor?: string;
}
export const Tag = ({
	children,
	bgColor = "bg-gray-200",
	textColor = "text-gray-800",
}: Props) => {
	return (
		<span
			className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${bgColor} ${textColor}`}
		>
			{children}
		</span>
	);
};
