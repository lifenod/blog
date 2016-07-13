desc "Generate blog files"
task :generate do
  system "JEKYLL_ENV=production bundle exec jekyll build"
end

desc "Generate and publish blog to gh-pages"
task :publish => [:generate] do
Dir.chdir "../dxsite"
  system "git add ."
  message = "Site updated at #{Time.now.utc}"
  system "git commit -am #{message.shellescape}"
  system "git push origin gh-pages"
end
