import ShopItem from "./ShopItem";

const ShopContainer = ({ items, score, setScore, updateItems }) => {
	const handleUpdateItems = (updatedItem) => {
		updateItems(updatedItem);
	};

	return (
		<div className="shop-container">
			{items.map((item) => {
				if (score >= item.cost || item.amount > 0)
					return (
						<ShopItem
							key={item.id}
							item={item}
							score={score}
							setScore={setScore}
							updateItems={handleUpdateItems}
						/>
					);
			})}
		</div>
	);
};

export default ShopContainer;
