/**
 * Failed to load data
 */

import { BiSolidMessageAltError } from "react-icons/bi";

interface Props {
	message: string;
}

export const FailedBox = ({ message }: Props) => {
	return (
		<div className="w-full md:w-[50%] mx-auto">
			<div className="flex flex-col items-center min-h-70 justify-center">
				<BiSolidMessageAltError
					size={48}
					className="text-red-500 mx-auto mt-8"
				/>
				<p className="text-red-500 mt-2">{message}</p>
			</div>
		</div>
	);
};
