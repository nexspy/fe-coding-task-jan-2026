import { AssetView } from "@/types/portfolio/Asset";
import { Avatar } from "../common/Avatar";

/**
 * Asset Avatar Component
 *  - contains Avatar (user initials) and name and symbol of asset
 */

interface Props {
	asset: AssetView;
}

export const AssetAvatar = ({ asset }: Props) => {
	return (
		<div className="grid grid-cols-[auto_1fr] gap-3 items-center">
			<Avatar fullname={asset.name} />
			<div>
				<h4 className="font-bold">{asset.name}</h4>
				<p className="text-xs text-gray-500">{asset.symbol}</p>
			</div>
		</div>
	);
};
