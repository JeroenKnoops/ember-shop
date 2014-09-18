class ProductSerializer < ActiveModel::Serializer
  include PushableSerializer

  attributes :id, :title, :description, :price, :stars, :image
  has_many :reviews
  embed :ids
end
