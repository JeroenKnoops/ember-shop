class ReviewSerializer < ActiveModel::Serializer
  include PushableSerializer
  attributes :id, :description, :rating, :user, :created_at
end
