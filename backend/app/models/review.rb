class Review < ActiveRecord::Base
  include Pushable

  belongs_to :product
end
