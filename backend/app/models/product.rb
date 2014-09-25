class Product < ActiveRecord::Base

  has_many :reviews, dependent: :destroy
  belongs_to :category

  validates_presence_of :title

  attr_accessor :stars

  def stars
    3
  end
end
