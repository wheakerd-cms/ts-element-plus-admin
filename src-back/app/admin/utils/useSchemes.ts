const useSchemes = (dataSchemes: any []) => {

	const getDetailSchemes = () => dataSchemes.filter(
		item => item?.detail?.show || item?.show || false
	).map(item => {
		const attributes = {
			prop: item?.detail?.attributes?.prop || item.prop,
			label: item?.detail?.attributes?.label || item.label,
		};

		Object.keys(attributes).forEach(key => {
			if (attributes[key] === undefined) {
				delete attributes[key];
			}
		});

		return {
			attributes: attributes,
			...item?.detail,
		};
	});

	const getSearchSchemes = () => dataSchemes.filter(
		item => item?.search?.show || item?.show || false
	).map(item => {
		const attributes = {
			prop: item?.search?.attributes?.prop || item.prop,
			label: item?.search?.attributes?.label || item.label,
		};

		Object.keys(attributes).forEach(key => {
			if (attributes[key] === undefined) {
				delete attributes[key];
			}
		});

		return {
			attributes: attributes,
			...item?.search,
		};
	});

	const getFormSchemes = () => dataSchemes.filter(
		item => item?.form?.show || item?.show || false
	).map(item => {
		const newItem = {
			col: item?.col,
			prop: item?.form?.prop || item.prop,
			label: item?.form?.label || item.label,
		};

		Object.keys(newItem).forEach(key => {
			if (newItem [key] === undefined) {
				delete newItem [key];
			}
		});

		return {
			...newItem,
			...item?.form,
		};
	});

	const getTableSchemes = () => dataSchemes.filter(
		item => item?.table?.show || item?.show || false
	).map(item => {
		const attributes = {
			prop: item?.table?.attributes?.prop || item.prop,
			label: item?.table?.attributes?.label || item.label,
		};

		Object.keys(attributes).forEach(key => {
			if (attributes[key] === undefined) {
				delete attributes[key];
			}
		});

		return {
			attributes: attributes,
			...item?.table,
		};
	});

	return {
		getDetailSchemes,
		getFormSchemes,
		getSearchSchemes,
		getTableSchemes,
	};
};

export {
	useSchemes,
};