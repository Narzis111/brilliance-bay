
import { Link } from 'react-router-dom';
import Cover from '../../shared/Cover/Cover';
import ContestItem from '../../components/ContestItem/ContestItem';

const MenuCategory = ({items, title, img}) => {
    return (
        <div className='pt-8'>
            { title && <Cover img={img} title={title}></Cover>}
            <div className="grid md:grid-cols-2 gap-10 my-16">
                {
                    items.map(item => <ContestItem
                        key={item._id}
                        item={item}
                    ></ContestItem>)
                }
            </div>
            <Link to={`/order/${title}`}>
            <div className='flex justify-center'><button className="btn btn-outline border-0 border-b-4 mt-4 capitalize">Order your favourite food</button></div>
            </Link>
        </div>
    );
};

export default MenuCategory;