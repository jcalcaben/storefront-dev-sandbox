import useProductCategoriesList from "../hooks/useProductCategoriesList";

export default (original) => {
  return function useProductFullDetails(props, ...restArgs) {
    const { product } = props;

    const categoriesListData = useProductCategoriesList({
      urlKey: product.url_key,
    });

    const { productDetails, ...defaultReturnData } = original(
      props,
      ...restArgs
    );

    return {
      ...defaultReturnData,
      productDetails: {
        ...productDetails,
        categoriesListData: categoriesListData,
      },
    };
  };
};
