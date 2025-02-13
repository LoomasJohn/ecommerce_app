import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

interface ProductProps {
    product: {
        id: string;
        name: string;
        description: string;
        price: number;
    };
}

const ProductPage: React.FC<ProductProps> = ({ product }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>${product.price}</p>
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    // Fetch the list of products from your API or database
    const res = await fetch('https://api.example.com/products');
    const products = await res.json();

    const paths = products.map((product: { id: string }) => ({
        params: { id: product.id },
    }));

    return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { params } = context;
    if (!params?.id) {
        return {
            notFound: true,
        };
    }
    const res = await fetch(`https://api.example.com/products/${params.id}`);
    const product = await res.json();

    return {
        props: {
            product,
        },
    };
};

export default ProductPage;