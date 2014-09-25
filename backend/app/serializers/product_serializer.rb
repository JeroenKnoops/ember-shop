class ProductSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :price, :stars, :image
  has_many :reviews, embed: :ids
  has_one :category
end
