const ShopItem = ({ item, score, setScore, updateItems }) => {
	const buyItem = () => {
		if (score >= item.cost) {
			setScore(score - item.cost);
			const updatedItem = {
				...item,
				amount: item.amount + 1,
				cost: Math.round(item.cost * 1.15),
			};
			updateItems(updatedItem);
		}
	};

	return (
		<table className="shop-btn" onClick={buyItem}>
			<tbody>
				<tr>
					<td id="image">
						<img src={item.image} alt={item.name} />
					</td>
					<td id="name-and-cost">
						<p>{item.name}</p>
						<p>
							<span>{item.cost}</span> bunnies
						</p>
					</td>
					<td id="amount">
						<span>{item.amount}</span>
					</td>
				</tr>
			</tbody>
		</table>
	);
};

export default ShopItem;
