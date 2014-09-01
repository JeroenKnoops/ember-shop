class AddFieldsToProducts < ActiveRecord::Migration
  def change
    add_column :products, :description, :text
    add_column :products, :price, :float
    add_column :products, :image, :text
  end
end
