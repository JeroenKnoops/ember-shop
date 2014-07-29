# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Product.destroy_all

100.times do
  Product.create do |product|
    product.title = Faker::Commerce.product_name
    product.description = Faker::Lorem.paragraph
    product.price = Faker::Commerce.price
    product.image_url = Faker::Lorem.word
  end
end
