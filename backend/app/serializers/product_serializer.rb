class ProductSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :price, :stars, :image_url
  has_many :reviews
  embed :ids
end
