import React from 'react';
import NavItem from "./NavItem";

interface ICategoryItem {
  category: any;
  resources: any;
  userId: string | null;
}

const CategoryItem = (props: ICategoryItem) => {
  const {category, resources, userId} = props;

  const getFilteredResources = (() => {
    return resources.filter(resource => {
      const categoryIds = resource.category_json.map(cat => cat.id)
      return categoryIds.includes(category.id);
    });
  })

  const categoryResources = getFilteredResources();

  return (
    <div className="CategoryItem">
      {category.name}
      <div className="navItems">
        {categoryResources.map(resource => (
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
