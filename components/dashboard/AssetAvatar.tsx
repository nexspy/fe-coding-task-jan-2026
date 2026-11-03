import { Asset } from "@/types/portfolio/Asset";
import { Avatar } from "../common/Avatar";

/**
 * Asset Avatar Component
 *  - initials badge plus the asset's symbol and name
 */

interface Props {
	asset: Pick<Asset, "name" | "symbol">;
}

export const AssetAvatar = ({ asset }: Props) => {
	return (
		<div className="flex min-w-0 items-center gap-3">
			<Avatar fullname={asset.name} />
			<div className="min-w-0">
				<p className="truncate text-sm font-semibold">{asset.symbol}</p>
				<p className="truncate text-xs text-muted-foreground">{asset.name}</p>
			</div>
		</div>
	);
};
