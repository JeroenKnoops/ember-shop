class Product < ActiveRecord::Base
  include Pushable

  has_many :reviews, dependent: :destroy

  validates_presence_of :title

  attr_accessor :stars

  def stars
    3
  end
end
