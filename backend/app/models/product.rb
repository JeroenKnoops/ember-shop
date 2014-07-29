class Product < ActiveRecord::Base

  has_many :reviews, dependent: :destroy

  def number_of_reviews
    reviews.count
  end

  def stars
    3
  end
end
