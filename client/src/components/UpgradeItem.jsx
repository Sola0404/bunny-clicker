const UpgradeItem = ({ item, upgrade, score, setScore, updateItems }) => {
	const upgradeItem = () => {
		setScore(score - upgrade.cost);
		const updatedItem = {
			...item,
			increment: upgrade.increment,
			upgrade: item.upgrade.map((u) => {
				return u.id === upgrade.id ? { ...u, bought: true } : u;
			}),
		};
		updateItems(updatedItem);
	};
	return (
		<div className="upgrade-item" onClick={upgradeItem}>
			<img src={item.image} alt={upgrade.name} />
			<p className="upgrade-item-name">{upgrade.name}:</p>
			<p>
				<em>{upgrade.cost} bunnies</em>
			</p>
			<p>{upgrade.description}</p>
		</div>
	);
};

export default UpgradeItem;
