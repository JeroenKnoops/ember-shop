class Product < ActiveRecord::Base

  has_many :reviews, dependent: :destroy

  def stars
    3
  end
end
