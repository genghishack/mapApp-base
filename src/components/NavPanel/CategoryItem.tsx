import React, {useState} from 'react';
import NavItem from "./NavItem";

interface ICategoryItem {
  category: any;
  resources: any;
  userId: string | null;
}

const CategoryItem = (props: ICategoryItem) => {
  const {category, resources, userId} = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const getFilteredResources = (() => {
    return resources.filter(resource => {
      const categoryIds = resource.category_json.map(cat => cat.id)
      return categoryIds.includes(category.id);
    });
  })

  const categoryResources = getFilteredResources();

  return (
    <div className="CategoryItem">
      <span
        className="category-link"
        onClick={() => {setIsExpanded(!isExpanded)}}
      >{category.name}</span>
      <div className="navItems">
        {isExpanded && categoryResources.map(resource => (
          <NavItem
            key={resource.id}
            resource={resource}
            userId={userId}
          />
        ))}
      </div>
    </div>
  )
}

export default CategoryItem;
