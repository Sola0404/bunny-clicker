import UpgradeItem from "./UpgradeItem";

const UpgradeContainer = ({ items, score, setScore, updateItems }) => {
	const handleUpdateItems = (updatedItem) => {
		updateItems(updatedItem);
	};

	return (
		<div className="upgrade-container">
			{items.map((item) => {
				if (item.amount > 0 && item.upgrade) {
					return item.upgrade.map((upgrade, index) => {
						if (!upgrade.bought && score >= upgrade.cost) {
							return (
								<UpgradeItem
									key={`${item.id}-${index}`}
									item={item}
									upgrade={upgrade}
									score={score}
									setScore={setScore}
									updateItems={handleUpdateItems}
								/>
							);
						}
						return null;
					});
				}
				return null;
			})}
		</div>
	);
};

export default UpgradeContainer;
