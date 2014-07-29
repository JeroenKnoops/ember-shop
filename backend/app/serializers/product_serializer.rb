class ProductSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :price, :number_of_reviews, :stars, :image_url
  has_many :reviews
  embed :ids
end
