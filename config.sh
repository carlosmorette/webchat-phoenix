echo "Removing build folder..."
rm -rf _build/

echo "Removing deps folder..."
rm -rf deps/
cd assets

echo "Removing node_modules folder..."
rm -rf node_modules/

echo "Installing JS dependencies..."
npm install
cd ..

echo "Installing Elixir dependencies"
mix deps.get

echo -e "\n\n"

echo "Congratulations!"
echo "Your project is ready!"
