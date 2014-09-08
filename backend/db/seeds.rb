# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'open-uri'
require 'base64'

CATEGORIES = %w(abstract animals business cats city food nightlife fashion people nature sports technics transport)

Product.destroy_all
User.destroy_all

100.times do
  Product.create do |product|
    product.title       = Faker::Commerce.product_name
    product.description = Faker::Lorem.paragraph
    product.price       = Faker::Commerce.price

    # Retrieve a random image from lorempixel.com
    # and store it as a base64 string.
    image_id            = rand(1..10)
    url                 = 'http://lorempixel.com/320/150/%s/%d' % [CATEGORIES.sample, image_id]

    product.image       = 'data:image/jpeg;base64,' + Base64.encode64(open(url) { |io| io.read })

    #product.image_url = Faker::Lorem.word
    rand(1..10).times do
      product.reviews << Review.new.tap do |review|
        review.description = Faker::Lorem.paragraph
        review.rating      = rand(0..5)
        review.user        = Faker::Name.name
        review.created_at  = rand(1..10).days.ago
      end
    end
  end
end

User.create([
  {
    email:                  'patrick@kabisa.nl',
    password:               'secret',
    password_confirmation:  'secret'
  }, {
    email:                  'jeroen@kabisa.nl',
    password:               'secret',
    password_confirmation:  'secret'
  }
])
